import { useState, useEffect } from 'react';

export function VaccinesCard() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('vaccine_image');
    if (savedImage) setImageSrc(savedImage);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageSrc(result);
      localStorage.setItem('vaccine_image', result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      {!imageSrc ? (
        <label htmlFor="upload-photo">
          <div className="w-72 h-72 border-[1.5px] border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition space-y-2">
            <div className="text-gray-600 text-4xl">📷</div>
            <span className="text-gray-600 text-sm">Adicionar cartão de vacina</span>
          </div>
        </label>
      ) : (
        <label htmlFor="upload-photo" className="cursor-pointer">
          <img src={imageSrc} alt="Cartão de vacina" className="w-72 h-72 object-cover rounded-lg hover:opacity-80 transition" />
        </label>
      )}
      <input
        id="upload-photo"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}