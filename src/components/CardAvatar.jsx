import './card.css'
const Card = ({ email, username, avatar, logout, btnText2 }) => {
    return (
        <div className="card">
            <div className="card__img">
                <svg width="100%" xmlns="http://www.w3.org/2000/svg">

                <image href={avatar} width="100%" height="100%" />
                </svg>
            </div>
            <div className="card__avatar">
                <svg style={{ borderRadius: '50px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                <image href={avatar} width="100%" height="100%" />
                </svg>
            </div>
            <div className="card__title">{email}</div>
            <div className="card__subtitle">{username}</div>
            <div className="card__wrapper">
                <a className="card__btn" href={logout} />
                <button className="card__btn card__btn-solid">{btnText2}</button>
            </div>
        </div>
    );
};

export default Card;
