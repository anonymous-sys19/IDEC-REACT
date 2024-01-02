const Upload = () => {
    return (
        <section className="section my-4">
            <div className="container text-center">
                <div className="title py-5">
                    <h1>IDEC UPLOAD</h1>
                    <p className="subtitle">Upload Images to the <strong>Server</strong></p>
                </div>

                <div className="row justify-content-center">
                    <div className="cont-Form">
                        <form
                            action="/upload"
                            encType="multipart/form-data"
                            method="POST"
                        >
                            <div className="rowI">
                                <div className="colF">
                                    <input
                                        type="file"
                                        className="formInput"
                                        name="image"
                                        accept="image/*"
                                        id="formFile"
                                        required
                                        multiple
                                    />
                                    <label htmlFor="mensaje"> Texto Superpuesto</label>
                                    <input type="text" name="mensaje" placeholder="Escribe un msj, #EVENTO" />
                                </div>
                                <div className="colB">
                                    <button
                                        type="submit"
                                        className="btn btn-warning"
                                    >Subir</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Upload