import React, { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  className?: string;
  slotId?: string; // O ID do slot do anúncio gerado no AdSense
  format?: 'auto' | 'fluid' | 'rectangle';
  layoutKey?: string; // Para In-feed ads
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  className = "", 
  slotId = "1234567890", // Placeholder: Substitua pelo seu data-ad-slot real
  format = "auto",
  layoutKey
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    // Detecta se estamos em ambiente de desenvolvimento (localhost) ou se não há ID configurado
    if (window.location.hostname === 'localhost' || slotId === "1234567890") {
        setIsDev(true);
    }

    const loadAd = () => {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        // Só tenta dar push se o elemento estiver vazio para evitar duplicação
        if (adRef.current && adRef.current.innerHTML === "") {
          // FIX: Verifica se o elemento tem largura antes de solicitar o anúncio.
          // Isso previne o erro "No slot size for availableWidth=0".
          if (adRef.current.offsetWidth > 0) {
            adsbygoogle.push({});
          } else {
             // Opcional: Se a largura for 0, o layout não está pronto ou o elemento está oculto.
             // Evitamos o push para não gerar erro no console.
             console.debug("AdSense: Container width is 0, skipping ad request to prevent error.");
          }
        }
      } catch (e) {
        console.error("AdSense Error:", e);
      }
    };

    // Adiciona um pequeno delay para garantir que o navegador calculou o layout (width/height)
    // Isso é crucial em estruturas responsivas ou ao carregar dentro de animações.
    const timer = setTimeout(loadAd, 300);

    return () => clearTimeout(timer);
  }, [slotId]);

  return (
    <div className={`w-full flex flex-col items-center justify-center my-8 ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-muted mb-2 opacity-60">
        Publicidade
      </span>
      
      <div className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-lg overflow-hidden min-h-[100px] flex items-center justify-center relative border border-slate-200 dark:border-slate-700/50">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-client="ca-pub-SEU_ID_AQUI" // IMPORTANTE: Substitua pelo seu ID de Publisher
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
          data-ad-layout-key={layoutKey}
        />
        
        {/* Placeholder Visual para Desenvolvimento ou quando o AdBlock bloqueia */}
        {isDev && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted p-4 text-center pointer-events-none opacity-50">
            <span className="text-xs font-mono border border-dashed border-muted px-2 py-1 rounded">
              Google Ads ({format})
            </span>
            <span className="text-[10px] mt-1">
              Configure o ID no arquivo AdBanner.tsx
            </span>
          </div>
        )}
      </div>
    </div>
  );
};