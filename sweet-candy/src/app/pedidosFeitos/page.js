'use client';

import Footer from '@/components/Footer';
import styles from './page.module.css';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';

export default function PedidosFeitos() {
    const [pedidos, setPedidos] = useState([]);
    const [mostrarDetalhes, setMostrarDetalhes] = useState(null);
    const [filtro, setFiltro] = useState('aguardando');
    const [buscaNome, setBuscaNome] = useState('');

    const fetchPedidos = async () => {
        try {
            const response = await fetch(`https://apisweetcandy.dev.vilhena.ifro.edu.br/admin/pedidos?filtro=${filtro}`);
            const data = await response.json();

            // Agrupar pedidos por cliente
            const agrupados = {};
            data.forEach(pedido => {
                const chave = pedido.email_cliente;

                if (!agrupados[chave]) {
                    agrupados[chave] = {
                        ...pedido,
                        cupcakes: [...pedido.cupcakes],
                        ids: [pedido.id_pedido]
                    };
                } else {
                    agrupados[chave].cupcakes.push(...pedido.cupcakes);
                    agrupados[chave].ids.push(pedido.id_pedido);
                }
            });

            setPedidos(Object.values(agrupados));
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, [filtro]);

    const mudarStatus = async (ids) => {
        try {
            await Promise.all(ids.map(async (id) => {
                await fetch(`https://apisweetcandy.dev.vilhena.ifro.edu.br/admin/pedidos/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'finalizado' })
                });
            }));

            await fetchPedidos();
            setMostrarDetalhes(null);
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
        }
    };

    const fecharDetalhes = (e) => {
        if (e.target.id === 'overlay') {
            setMostrarDetalhes(null);
        }
    };

    const pedidosFiltrados = pedidos.filter(p =>
        p.nome_completo.toLowerCase().includes(buscaNome.toLowerCase())
    );

    return (
        <div>
            <Header />
            <div>
                <form className={styles.form}>
                    <h1 className={styles.h1}>Pedidos feitos</h1>

                    <div className={styles.botoesCima}>
                        <button type="button" className={styles.buttonCima} onClick={() => setFiltro('aguardando')}>
                            Preparando
                        </button>
                        <button type="button" className={styles.buttonCima} onClick={() => setFiltro('finalizado')}>
                            Finalizados
                        </button>
                    </div>

                    {/* Input com imagem dentro */}
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Digite o nome do cliente"
                            value={buscaNome}
                            onChange={(e) => setBuscaNome(e.target.value)}
                            style={{ paddingLeft: '40px' }} // espaço para a imagem
                        />
                        <img
                            className={styles.icon}
                            src="/images/lupa.png"
                            alt="Ícone de busca"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '23px',
                                height: '23px',
                                pointerEvents: 'none',
                            }}
                        />
                    </div>

                    {pedidosFiltrados.map(pedido => (
                        <div key={pedido.email_cliente} className={styles.detalhePedido}>
                            <div className={styles.idData}>
                                <p className={styles.id}>Cliente: {pedido.nome_completo}</p>
                                <p className={styles.data}>Data: {pedido.data_criacao}</p>
                            </div>

                            <button
                                type="button"
                                className={styles.button}
                                onClick={() => setMostrarDetalhes(pedido.email_cliente)}
                            >
                                {mostrarDetalhes === pedido.email_cliente ? 'Ocultar detalhes' : 'Mostrar detalhes'}
                            </button>

                            {mostrarDetalhes === pedido.email_cliente && (
                                <div id="overlay" className={styles.overlay} onClick={fecharDetalhes}>
                                    <div className={styles.detalhesExtras} onClick={(e) => e.stopPropagation()}>
                                        <div className={styles.divDetalhes}>
                                            <p><strong>Nome:</strong> {pedido.nome_completo}</p>
                                            <p><strong>Email:</strong> {pedido.email_cliente}</p>
                                            <p><strong>Valor Total:</strong> R$ {pedido.valor_total}</p>
                                            <p><strong>Pagamento:</strong> {pedido.forma_pagamento}</p>
                                        </div>

                                        {pedido.cupcakes.map((cupcake, index) => (
                                            <div key={index} className={styles.divDetalhes}>
                                                <p><strong>Tamanho:</strong> {cupcake.tamanho}</p>
                                                <p><strong>Recheio:</strong> {cupcake.recheio}</p>
                                                <p><strong>Cobertura:</strong> {cupcake.cobertura}</p>
                                                <p><strong>Cor da cobertura:</strong> {cupcake.cor_cobertura}</p>
                                                <p><strong>Quantidade:</strong> {cupcake.quantidade}</p>
                                            </div>
                                        ))}

                                        <div className={styles.divDetalhes}>
                                            <p><strong>Rua:</strong> {pedido.rua}</p>
                                            <p><strong>Número:</strong> {pedido.numero}</p>
                                            <p><strong>Bairro:</strong> {pedido.bairro}</p>
                                            <p><strong>CEP:</strong> {pedido.cep}</p>
                                            <p><strong>Complemento:</strong> {pedido.complemento}</p>
                                        </div>

                                        <div className={styles.divDetalhes}>
                                            <p><strong>Status:</strong> {pedido.status === 'aguardando' ? 'Preparando' : 'Finalizado'}</p>
                                        </div>

                                        {pedido.status === 'aguardando' && (
                                            <button
                                                className={styles.buttonMarcarConcluido}
                                                onClick={() => mudarStatus(pedido.ids)}
                                            >
                                                Marcar como finalizado
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </form>
            </div>
            <Footer />
        </div>
    );
}
