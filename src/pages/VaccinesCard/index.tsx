import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

export function VaccinesCard() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    get('vaccine_image').then((savedImage) => {
      if (typeof savedImage === 'string') {
        setImageSrc(savedImage);
      }
    });
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        set('vaccine_image', result).then(() => {
          setImageSrc(result);
        });
      } else {
        console.error('Falha ao ler a imagem.');
      }
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