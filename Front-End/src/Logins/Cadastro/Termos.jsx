import * as React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Checkbox } from "@mui/material";
import "./buttonanchor.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "75%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 12,
    p: 4,
    overflow: 'scroll',
    height: '100%',
    display: 'block'
};

export default function ModalTermos({aceito, setAceito}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Checkbox onChange={() => setAceito(!aceito)}/>Eu aceito os <button className="banchor" onClick={handleOpen}>Termos e Condições</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <h1>Termos e Condições</h1>

                        <p>Por favor, leia atentamente os seguintes termos e condições antes de usar o nosso site de controle de vendas. Ao acessar ou usar o site, você concorda em cumprir e estar vinculado a estes termos e condições. Se você não concordar com qualquer parte destes termos, não poderá usar o site.</p>

                        <h2>1. Definições:</h2>
                        <ul>
                            <li><strong>a) "Site"</strong> refere-se ao site de controle de vendas.</li>
                            <li><strong>b) "Usuário"</strong> refere-se a qualquer pessoa que acesse e use o site.</li>
                            <li><strong>c) "Vendedor"</strong> refere-se a qualquer pessoa ou entidade que utiliza os serviços de controle de vendas oferecidos pelo site.</li>
                            <li><strong>d) "Nós", "nosso" ou "a empresa"</strong> refere-se à entidade responsável pela operação do site.</li>
                        </ul>

                        <h2>2. Serviços Oferecidos:</h2>
                        <ul>
                            <li><strong>a) O site</strong> fornece uma plataforma para os vendedores gerenciarem vendas, estoque e outros aspectos relacionados ao comércio.</li>
                            <li><strong>b) Não somos parte das transações</strong> entre vendedores e compradores e não temos controle sobre a qualidade, segurança ou legalidade dos produtos ou serviços oferecidos no site.</li>
                        </ul>

                        <h2>3. Responsabilidades do Usuário:</h2>
                        <ul>
                            <li><strong>a) Os usuários concordam</strong> em fornecer informações precisas e atualizadas ao se registrar no site.</li>
                            <li><strong>b) Os usuários concordam em cumprir todas as leis aplicáveis</strong> relacionadas às transações comerciais conduzidas por meio do site.</li>
                        </ul>

                        <h2>4. Isenção de Responsabilidade:</h2>
                        <ul>
                            <li><strong>a) O site é fornecido "no estado em que se encontra",</strong> e não fazemos garantias de qualquer tipo, expressas ou implícitas, sobre a precisão, confiabilidade ou disponibilidade do site.</li>
                            <li><strong>b) Não somos responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes,</strong> perda de lucros ou interrupção de negócios resultantes do uso ou da impossibilidade de uso do site.</li>
                            <li><strong>c) Os vendedores são os únicos responsáveis pela qualidade, segurança e legalidade dos produtos ou serviços</strong> que oferecem através do site. Os usuários concordam em isentar-nos de qualquer responsabilidade relacionada a produtos defeituosos ou serviços inadequados.</li>
                        </ul>

                        <h2>5. Links para Terceiros:</h2>
                        <p>O site pode conter links para sites de terceiros. Não temos controle sobre esses sites e não somos responsáveis pelo conteúdo ou práticas de privacidade deles. A inclusão de tais links não implica em nosso endosso ou associação com esses sites.</p>

                        <h2>6. Propriedade Intelectual:</h2>
                        <ul>
                            <li><strong>a) Todo o conteúdo do site, incluindo, mas não se limitando a, texto, logotipos, imagens, gráficos e software,</strong> é de propriedade da empresa e está protegido por direitos autorais.</li>
                            <li><strong>b) Os usuários concordam em não reproduzir, distribuir ou criar obras derivadas do conteúdo do site</strong> sem autorização prévia por escrito.</li>
                        </ul>

                        <h2>7. Rescisão:</h2>
                        <p>Reservamo-nos o direito de encerrar ou suspender a conta de qualquer usuário que viole estes termos e condições a nosso critério.</p>

                        <h2>8. Alterações nos Termos e Condições:</h2>
                        <p>Reservamo-nos o direito de alterar estes termos e condições a qualquer momento. É responsabilidade do usuário revisar periodicamente os termos e condições atualizados.</p>

                        <h2>9. Lei Aplicável:</h2>
                        <p>Estes termos e condições serão regidos pelas leis do [Inserir o país ou estado da jurisdição], e qualquer litígio será resolvido pelos tribunais competentes dessa jurisdição.</p>

                        <h2>10. Contato:</h2>
                        <p>Para entrar em contato conosco em relação a estes termos e condições, entre em contato por [Inserir informações de contato].</p>

                        <p>Ao usar o site, você concorda em cumprir estes termos e condições. Se você não concordar com eles, não use o site.</p>

                        <p><strong>Última atualização: 24/10/2023</strong></p>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}