import Link from "next/link";
import styles from './Footer.module.css';
import Image from "next/image";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.todasAsInformacoesFooter}>
                <div className={styles.cardFooter}>
                    <p className={styles.informacaoFooter}>Entre em contato</p>
                    <div className={styles.displayInformacao}>
                        <Image className={styles.iconesFooter} src="/images/contato.jpg" alt="Contato" width={25} height={25} />
                        <Link className={styles.contatofooter} href="">Contato</Link>
                    </div>
        
                    <div className={styles.displayInformacao}>
                        <Image className={styles.iconesFooter} src="/images/telefone.jpg" alt="Telefone:" width={25} height={25} />
                        <p className={styles.miniInformacao}>+ 55 (99) 9999-9999</p>
                    </div>
        
                    <div className={styles.displayInformacao}>
                        <Image className={styles.iconesFooter} src="/images/gmail.jpg" alt="E-mail: " width={25} height={25} />
                        <p className={styles.miniInformacao}>sweetcandycupcakeria@gmail.com</p>
                    </div>
                </div>
        
                <div className={styles.cardFooter}>
                    <p className={styles.informacaoFooter}>Nos siga no Instagram</p>
                    <div className={styles.displayInformacao}>
                        <Image className={styles.iconesFooter} src="/images/insta.jpg" alt="Instagram: " width={25} height={25} />
                        <Link className={styles.instagram} href="https://www.instagram.com/cupcakeriacandy/">@cupcakeriacandy</Link>
                    </div>                
                    <div className={styles.divLocalizacao}>
                        <p className={styles.informacaoFooter}>Localização</p>
                        <div className={styles.displayInformacao}>
                            <Image className={styles.iconesFooter} src="/images/localizacao.jpg" alt="Localização: " width={25} height={25} />
                            <p className={styles.miniInformacao}>BR-174, Km 3 S/n - Zona Urbana, Vilhena - Ro, 76980-000</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className={styles.direitosfooter}>©2024 Sweet Candy Todos os direitos reservados.</p>
        </div>
    )
}