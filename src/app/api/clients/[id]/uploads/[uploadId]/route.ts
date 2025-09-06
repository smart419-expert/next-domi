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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; uploadId: string }> }
) {
  try {
    const { id: clientId, uploadId } = await params;
    const body = await request.json();

    const uploads = clientUploads.get(clientId) || [];
    const uploadIndex = uploads.findIndex(upload => upload.id === uploadId);

    if (uploadIndex === -1) {
      return NextResponse.json({ error: 'Upload not found' }, { status: 404 });
    }

    // Update the upload
    const updatedUpload = {
      ...uploads[uploadIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    uploads[uploadIndex] = updatedUpload;
    clientUploads.set(clientId, uploads);

    return NextResponse.json({
      success: true,
      upload: updatedUpload,
    });
  } catch (error) {
    console.error('Error updating upload:', error);
    return NextResponse.json(
      { error: 'Failed to update upload' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; uploadId: string }> }
) {
  try {
    const { id: clientId, uploadId } = await params;

    const uploads = clientUploads.get(clientId) || [];
    const uploadIndex = uploads.findIndex(upload => upload.id === uploadId);

    if (uploadIndex === -1) {
      return NextResponse.json({ error: 'Upload not found' }, { status: 404 });
    }

    // Remove the upload
    uploads.splice(uploadIndex, 1);
    clientUploads.set(clientId, uploads);

    return NextResponse.json({
      success: true,
      message: 'Upload deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting upload:', error);
    return NextResponse.json(
      { error: 'Failed to delete upload' },
      { status: 500 }
    );
  }
}
