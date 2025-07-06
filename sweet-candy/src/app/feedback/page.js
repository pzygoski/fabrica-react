'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CadastrarFeedback() {
  const [mensagem, setMensagem] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [estrelasSelecionadas, setEstrelasSelecionadas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  // --- NOVO ESTADO: Para armazenar os feedbacks da API ---
  const [feedbacksRecentes, setFeedbacksRecentes] = useState([]);
  const router = useRouter();

  // --- Adição para verificar o login ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const clienteId = localStorage.getItem('clienteId');
      if (!clienteId) {
        alert('Você precisa estar logado para dar feedback.');
        router.push('/login');
      }
    }
  }, [router]);

  // --- NOVO EFEITO: Carregar feedbacks quando o modal é aberto ---
  useEffect(() => {
    if (mostrarModal) {
      fetchFeedbacks();
    }
  }, [mostrarModal]); // Este efeito roda sempre que 'mostrarModal' muda

  function msg(event) {
    const arquivos = Array.from(event.target.files);
    const arquivosRestantes = 3 - previews.length;

    if (arquivosRestantes <= 0) {
      alert("Você só pode adicionar até 3 imagens.");
      return;
    }

    const selecionadas = arquivos.slice(0, arquivosRestantes);
    const novasPreviews = selecionadas.map((arquivo) =>
      URL.createObjectURL(arquivo)
    );

    setPreviews((prev) => [...prev, ...novasPreviews]);
    setMensagem(true);
    setTimeout(() => setMensagem(false), 3000);
  }

  function removerPreview(index) {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleEstrela(num) {
    setEstrelasSelecionadas((prev) => {
      if (prev.length === 1 && prev[0] === num) {
        return [];
      }
      return Array.from({ length: num }, (_, i) => i + 1);
    });
  }

  async function handleSubmitFeedback() {
    const clienteId = typeof window !== 'undefined' ? localStorage.getItem('clienteId') : null;

    if (!clienteId) {
      alert('Você precisa estar logado para enviar o feedback.');
      router.push('/login');
      return;
    }

    if (estrelasSelecionadas.length === 0) {
      alert('Por favor, selecione uma avaliação em estrelas.');
      return;
    }

    if (!feedbackText.trim()) {
      alert('Por favor, digite seu feedback.');
      return;
    }

    const fotosBase64 = await Promise.all(
      previews.map(async (previewUrl) => {
        const response = await fetch(previewUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      })
    );

    const feedbackData = {
      id_cliente: parseInt(clienteId),
      estrelas: estrelasSelecionadas.length,
      comentario: feedbackText,
      // Sua API espera uma string para 'foto'. Enviaremos a primeira imagem.
      // Se houver múltiplas, você precisaria decidir como concatená-las ou ajustar a API.
      foto: fotosBase64.length > 0 ? fotosBase64[0] : null,
    };

    try {
      const response = await fetch('https://apisweetcandy.dev.vilhena.ifro.edu.br/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Feedback enviado com sucesso! Agradecemos sua avaliação.');
        setEstrelasSelecionadas([]);
        setFeedbackText("");
        setPreviews([]);
        router.push('/pedido');
      } else {
        alert(`Erro ao enviar feedback: ${data.erro || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro aoa conectar com a API de envio:', error);
      alert('Não foi possível conectar com o servidor para enviar o feedback.');
    }
  }

  // --- NOVA FUNÇÃO: Para buscar os feedbacks da API ---
  async function fetchFeedbacks() {
    try {
      const response = await fetch('https://apisweetcandy.dev.vilhena.ifro.edu.br/feedbacks');
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data = await response.json();
      setFeedbacksRecentes(data); // Atualiza o estado com os feedbacks
    } catch (error) {
      console.error('Erro ao buscar feedbacks:', error);
      alert('Não foi possível carregar os feedbacks recentes.');
      setFeedbacksRecentes([]); // Limpa ou mantém vazio em caso de erro
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.h1}>Comentar</h1>

        <div className={styles.rating}>
          {[5, 4, 3, 2, 1].map((num) => (
            <div key={num} style={{ display: "inline-block" }}>
              <input
                className={styles.input}
                type="checkbox"
                id={`star${num}`}
                checked={estrelasSelecionadas.includes(num)}
                onChange={() => toggleEstrela(num)}
              />
              <label className={styles.label} htmlFor={`star${num}`}>
                ★
              </label>
            </div>
          ))}
        </div>

        <label className={styles.label} htmlFor="feedback">
          <input
            className={styles.input}
            type="text"
            placeholder="Digite seu feedback..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </label>

        <label className={styles.label} htmlFor="image" id="file" tabIndex="0">
          <span className={styles.filee}> Carregue fotos 1/3</span>
          <input
            className={`${styles.input} ${styles.image}`}
            type="file"
            id="image"
            accept="image/*"
            multiple
            onChange={msg}
          />
          <span>
            <img
              className={styles.fotoinput}
              src="/images/importimage.png"
              alt="imagem"
            />
          </span>
        </label>

        {previews.length > 0 && (
          <div className={styles.containerPrevia}>
            {previews.map((src, index) => (
              <div
                key={index}
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={src}
                  alt={`prévia ${index + 1}`}
                  className={styles.imagemPrevia}
                />
                <button
                  type="button"
                  onClick={() => removerPreview(index)}
                  aria-label="Remover imagem"
                  className={styles.botaoRemoverImagem}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {mensagem && (
          <div className={styles.aviso}>Imagem anexada com sucesso! 𐙚</div>
        )}

        <div className={styles.buttons}>
          <button
            className={styles.button}
            id="back"
            onClick={() => router.back()}
          >
            Voltar
          </button>

          <button
            className={styles.button}
            id="confirm"
            onClick={handleSubmitFeedback}
          >
            Confirmar
          </button>

          <button
            className={styles.button}
            onClick={() => setMostrarModal(true)}
          >
            Ver Feedbacks Recentes
          </button>
        </div>
      </div>

      {mostrarModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.fechar}
              onClick={() => setMostrarModal(false)}
            >
              ×
            </button>
            <h2 className={styles.h2}>Feedbacks Recentes</h2>

            {/* Renderização Dinâmica dos Feedbacks */}
            {feedbacksRecentes.length > 0 ? (
              feedbacksRecentes.map((feedback) => (
                <div key={feedback.id_feedback} className={styles.feedbackItem}>
                  <div className={styles.feedbackInfo}>
                    {/* Exibindo "Cliente Anônimo" ou adaptando para nomes, se houver na API */}
                    <span className={styles.clienteNome}>
                      {feedback.nome_cliente || `Cliente ${feedback.id_cliente}`}
                    </span>
                    <span className={styles.dataFeedback}>
                      {new Date(feedback.data_criacao + 'Z').toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className={styles.estrelas}>
                    {'★'.repeat(feedback.estrelas)}{'☆'.repeat(5 - feedback.estrelas)}
                  </div>
                  <p className={styles.comentario}>
                    {feedback.comentario}
                  </p>
                  {feedback.foto && (
                    <div className={styles.feedbackImagens}>
                      {/* A 'foto' da API é a URL Base64 ou o caminho.
                          Sua API Node.js já está retornando a foto como uma string Base64 no campo 'foto'.
                          Então, podemos usá-la diretamente como src.
                      */}
                      <img src={feedback.foto} alt="Imagem do Feedback" />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#666' }}>
                Nenhum feedback encontrado ainda. Seja o primeiro a comentar!
              </p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}