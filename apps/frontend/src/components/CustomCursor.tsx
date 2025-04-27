import { useEffect } from "react";
// Importa os hooks e o componente 'motion' do framer-motion
import { motion, useMotionValue, useSpring, SpringOptions } from "framer-motion";

export function CustomCursor() {
  // Cria motion values para x e y. Eles rastreiam valores fora do ciclo de renderização do React.
  const mouseX = useMotionValue(-100); // Inicializa fora da tela
  const mouseY = useMotionValue(-100);

  // Configurações da animação de mola (spring) para suavidade
  const springConfig: SpringOptions = {
    damping: 25, // Reduz a "oscilação"
    stiffness: 500, // Rapidez da mola
    mass: 0.1, // "Peso" do cursor (afeta a inércia)
  };

  // Aplica a animação de mola aos motion values
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Atualiza os motion values diretamente (não causa re-renderização)
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Esconde o cursor padrão
    document.body.style.cursor = "none";
    const interactiveElements = document.querySelectorAll("a, button, input, select, textarea");
    interactiveElements.forEach((el) => ((el as HTMLElement).style.cursor = "none"));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = ""; // Restaura o cursor padrão
      interactiveElements.forEach((el) => ((el as HTMLElement).style.cursor = ""));
    };
    // mouseX e mouseY não precisam estar nas dependências, pois são motion values
  }, []); // Executa apenas uma vez na montagem

  return (
    // Usa motion.div em vez de div normal
    <motion.div
      className="custom-cursor" // Adiciona uma classe se precisar de estilização extra no CSS
      style={{
        // Vincula os motion values (com spring) diretamente ao estilo
        // Framer Motion otimiza a atualização dessas propriedades
        position: "fixed",
        top: 0, // Necessário para position fixed
        left: 0, // Necessário para position fixed
        translateX: smoothMouseX, // Usa os valores suavizados
        translateY: smoothMouseY,
        // Centraliza o cursor visualmente no ponteiro
        x: "-50%",
        y: "-50%",
        pointerEvents: "none", // Impede interação com o cursor
        zIndex: 9999,
        // Estilo visual (mantendo o círculo amarelo)
        width: "15px",
        height: "15px",
        borderRadius: "50%",
        backgroundColor: "rgba(250, 204, 21, 0.9)", // Amarelo (bg-yellow-400)
      }}
    />
  );
}
