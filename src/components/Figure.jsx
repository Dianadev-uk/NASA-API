const Figure = ({ data }) => {
    return (
        <>
            <div>
                <h2>{data.title}</h2>
                <img className="nasa_url" src={data.url} alt={data.title} />
                <div>
                    <p>Date: {data.date}</p>
                    <p>Copyright: {data.copyRight}</p>
                </div>
                <p className="p_explanation">{data.explanation}</p>
            </div>
        </>
    );
};

export default Figure;