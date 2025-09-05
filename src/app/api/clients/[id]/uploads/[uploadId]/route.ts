import { NextRequest, NextResponse } from 'next/server';

// Mock data - in a real app, this would be stored in a database
const clientUploads = new Map<string, any[]>();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; uploadId: string } }
) {
  try {
    const clientId = params.id;
    const uploadId = params.uploadId;
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
  { params }: { params: { id: string; uploadId: string } }
) {
  try {
    const clientId = params.id;
    const uploadId = params.uploadId;

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
