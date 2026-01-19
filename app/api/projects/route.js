import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

const isAuthenticated = (request) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== process.env.ADMIN_PASSWORD) {
        return false;
    }
    return true;
};

async function getProjects() {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
}

async function saveProjects(projects) {
    await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2));
}

async function saveFile(file, dir, relativePath) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(bytes));

    // Construct full file path
    // relativePath might be "css/style.css" -> join(dir, "css", "style.css")
    // We need to resolve the folder carefully
    // But wait, path.join(dir, relativePath) is enough if relativePath uses correct separators
    // Standardize relativePath to avoid security issues?
    const cleanPath = relativePath.replace(/^(\.\.(\/|\\|$))+/, ''); // Simple sanitization
    const filePath = path.join(dir, cleanPath);

    // Ensure the directory for this specific file exists
    const fileDir = path.dirname(filePath);
    await fs.mkdir(fileDir, { recursive: true });

    await fs.writeFile(filePath, buffer);
    return filePath;
}

export async function GET() {
    try {
        const projects = await getProjects();
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const imageFile = formData.get('imageFile');

        // Arrays
        const siteFiles = formData.getAll('siteFiles');
        const filePaths = formData.getAll('filePaths');

        if (!title || !description || !imageFile || !siteFiles || siteFiles.length === 0) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const projects = await getProjects();
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        const newIdStr = newId.toString();
        const projectDir = path.join(uploadsDir, newIdStr);
        const siteDir = path.join(projectDir, 'site');

        // 1. Save Image
        const imageExt = imageFile.name.split('.').pop();
        const imageName = `thumbnail.${imageExt}`;
        // Simple save for image (it's flat in projectDir)
        await fs.mkdir(projectDir, { recursive: true });
        // Manual save because saveFile is now specific to our relative path logic
        const imgBytes = await imageFile.arrayBuffer();
        await fs.writeFile(path.join(projectDir, imageName), Buffer.from(new Uint8Array(imgBytes)));
        const publicImagePath = `/uploads/${newIdStr}/${imageName}`;

        // 2. Save Site Files
        await fs.mkdir(siteDir, { recursive: true });

        let hasIndexHtml = false;

        for (let i = 0; i < siteFiles.length; i++) {
            const file = siteFiles[i];
            // If filePaths provided, use it, else fallback to filename
            const relativePath = (filePaths[i] && typeof filePaths[i] === 'string') ? filePaths[i] : file.name;

            if (file instanceof File) {
                await saveFile(file, siteDir, relativePath);
                if (relativePath.endsWith('index.html')) hasIndexHtml = true;
            }
        }

        // Determine Demo Link
        // We try to find where index.html ended up.
        // If user dropped folder "MySite" -> "MySite/index.html".
        // If user dropped files -> "index.html".
        let publicDemoLink = '';

        const indexIndex = filePaths.findIndex(p => p.endsWith('index.html'));
        if (indexIndex !== -1) {
            // e.g. "MyProject/index.html" -> "/uploads/123/site/MyProject/index.html"
            publicDemoLink = `/uploads/${newIdStr}/site/${filePaths[indexIndex]}`;
        } else {
            // Fallback default
            publicDemoLink = `/uploads/${newIdStr}/site/index.html`;
            console.warn('Warning: No index.html found in upload paths');
        }

        const newProject = {
            id: newId,
            title,
            description,
            image: publicImagePath,
            demoLink: publicDemoLink
        };

        projects.push(newProject);
        await saveProjects(projects);

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to create project: ' + error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const id = parseInt(formData.get('id'));
        const title = formData.get('title');
        const description = formData.get('description');
        const imageFile = formData.get('imageFile');
        const siteFiles = formData.getAll('siteFiles');
        const filePaths = formData.getAll('filePaths');

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const projects = await getProjects();
        const index = projects.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const projectDir = path.join(uploadsDir, id.toString());
        const siteDir = path.join(projectDir, 'site');
        let updatedFields = { title, description };

        if (imageFile && imageFile instanceof File && imageFile.size > 0) {
            const imageExt = imageFile.name.split('.').pop();
            const imageName = `thumbnail_${Date.now()}.${imageExt}`;
            await fs.mkdir(projectDir, { recursive: true });
            const imgBytes = await imageFile.arrayBuffer();
            await fs.writeFile(path.join(projectDir, imageName), Buffer.from(new Uint8Array(imgBytes)));
            updatedFields.image = `/uploads/${id}/${imageName}`;
        }

        if (siteFiles && siteFiles.length > 0 && siteFiles[0] instanceof File && siteFiles[0].size > 0) {
            await fs.mkdir(siteDir, { recursive: true });

            // Optional: Clean old site folder?
            // await fs.rm(siteDir, { recursive: true, force: true }).catch(()=>{});
            // await fs.mkdir(siteDir, { recursive: true });

            for (let i = 0; i < siteFiles.length; i++) {
                const file = siteFiles[i];
                const relativePath = (filePaths[i] && typeof filePaths[i] === 'string') ? filePaths[i] : file.name;
                if (file instanceof File) {
                    await saveFile(file, siteDir, relativePath);
                }
            }

            const indexIndex = filePaths.findIndex(p => p.endsWith('index.html'));
            if (indexIndex !== -1) {
                updatedFields.demoLink = `/uploads/${id}/site/${filePaths[indexIndex]}`;
            } else {
                updatedFields.demoLink = `/uploads/${id}/site/index.html`;
            }
        }

        projects[index] = { ...projects[index], ...updatedFields };
        await saveProjects(projects);

        return NextResponse.json(projects[index]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const projects = await getProjects();
        const filteredProjects = projects.filter(p => p.id !== parseInt(id));

        if (projects.length === filteredProjects.length) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const projectDir = path.join(uploadsDir, id);
        try {
            await fs.rm(projectDir, { recursive: true, force: true });
        } catch (e) {
            console.error('Failed to cleanup directory', e);
        }

        await saveProjects(filteredProjects);

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
