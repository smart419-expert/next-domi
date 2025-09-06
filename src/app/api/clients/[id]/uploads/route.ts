import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would be stored in a database
interface Upload {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  isFeatured: boolean;
  uploadedAt: string;
  clientId: string;
}

const clientUploads = new Map<string, Upload[]>();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params;
    const uploads = clientUploads.get(clientId) || [];
    
    return NextResponse.json({
      success: true,
      uploads,
    });
  } catch (error) {
    console.error('Error fetching client uploads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch uploads' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: clientId } = await params;
    const body = await request.json();
    const { url, fileName, size, type } = body;

    if (!url) {
      return NextResponse.json({ error: 'File URL is required' }, { status: 400 });
    }

    // Create new upload record
    const uploadId = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const newUpload = {
      id: uploadId,
      url,
      name: fileName || 'Unknown file',
      size: size || 0,
      type: type || 'application/octet-stream',
      isFeatured: false,
      uploadedAt: new Date().toISOString(),
      clientId,
    };

    // Add to client's uploads
    const existingUploads = clientUploads.get(clientId) || [];
    existingUploads.push(newUpload);
    clientUploads.set(clientId, existingUploads);

    return NextResponse.json({
      success: true,
      upload: newUpload,
    });
  } catch (error) {
    console.error('Error creating client upload:', error);
    return NextResponse.json(
      { error: 'Failed to create upload' },
      { status: 500 }
    );
  }
}
