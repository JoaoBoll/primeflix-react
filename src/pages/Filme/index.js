import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../services/api";
import './filme-info.css';

function Filme() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "5a569954ddc95a299a8cf6c1aa9cefa5",
                    language: "pt-BR",
                }
            }).then((response)=> {
                setFilme(response.data);
                setLoading(false)
            }).catch((err)=>{
                console.log('Filme não encontrado');
                navigate("/", {replace:true});
                return;
            })
        }

        loadFilme();

    },[id, navigate])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("_primeFlix");
        console.log(minhaLista);

        let filmesSalvos = JSON.parse(minhaLista) || [];

        console.log("FilmeSalvo: " + filmesSalvos)

        const hasFilme = filmesSalvos.some((filmeSalvo)=>filmeSalvo.id === filme.id);

        console.log("hasFilme: " + hasFilme)

        if (hasFilme) {
            alert("Este filme já está na lista.");
            return;
        }

        filmesSalvos.push(filme);

        localStorage.setItem("_primeFlix", JSON.stringify(filmesSalvos))
        alert("Filme salvo com sucesso!")
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target={"_blank"} rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;
