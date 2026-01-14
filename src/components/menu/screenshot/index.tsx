import { Camera } from 'lucide-react';

export const Screenshot = () => {
  const handleCapture = async () => {
    const video = document.getElementById('video') as HTMLVideoElement;
    if (!video?.srcObject) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1920;
    canvas.height = video.videoHeight || 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), 'image/png');
    });

    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: `screenshot-${timestamp}.png`,
        types: [
          {
            description: 'Sipeed NanoKVM-USB Screenshot',
            accept: { 'image/png': ['.png'] }
          }
        ]
      });

      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (err) {
      console.error('Screenshot failed:', err);
    }
  };

  return (
    <div
      className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded text-neutral-300 hover:bg-neutral-700/70 hover:text-white"
      onClick={handleCapture}
    >
      <Camera size={18} />
    </div>
  );
};
