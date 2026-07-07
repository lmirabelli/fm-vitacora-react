import './Billeteras.css';

export const Billeteras = () => {
    return (
        <div className="standard agradecimiento-container">
            <div className="agradecimiento-card">
                <h2>¡Gracias por usar FM BITÁCORA!</h2>
                <p className="autor">by Chuche Mirabelli</p>
                
                <hr className="divisor" />
                
                <p className="mensaje">
                    Esta app nació con el objetivo de enriquecer y llevar al siguiente nivel nuestras 
                    partidas de Football Manager. Si la herramienta te es útil, te ayuda a planificar tus 
                    temporadas y querés apoyar el desarrollo de futuras actualizaciones, podés colaborar 
                    invitándome un café. ¡Todo aporte suma un montón!
                </p>

                <div className="seccion-donativos">
                    <div className="opcion-pago">
                        <h4>Desde Argentina 🇦🇷</h4>
                        <a 
                            href="https://cafecito.app/chuche" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-donar btn-cafecito"
                        >
                            ☕ Invitame un Cafecito
                        </a>
                    </div>
                    <div className="opcion-pago">
                        <h4>Desde el Exterior 🌎</h4>
                        <a 
                            href="https://ko-fi.com/chuche" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-donar btn-kofi"
                        >
                            ❤️ Apoyar en Ko-fi
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};