import { useState, useContext } from "react";
import Layout from "../components/Layout";
import { parseQuestionsFromText } from "@/utils/question";
import { useRouter } from "next/router";
import { QuestionContext } from "../utils/QuestionContext";

const IndexPage = () => {
  const [fileContent, setFileContent] = useState("");
  const { questions, setQuestions } = useContext(QuestionContext);

  const router = useRouter();
  const handleStartExam = () => {
    router.push("/exam");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
      const parsedQuestions = parseQuestionsFromText(content);
      setQuestions(parsedQuestions);
    };
    reader.readAsText(file);
  };

  return (
    <Layout section="">
      <div className="container">
        <h1 className="title">Bienvenido al sistema de exámenes</h1>
        <p className="description">
          Por favor, selecciona un archivo de texto con las preguntas:
        </p>
        <div className="file-input">
          <label htmlFor="file">Formato del archivo .txt:</label>
          <pre className="example-text">
            # Sección 1<br />
            $ ¿Cuál es la capital de Francia?
            <br />a{")"} Madrid
            <br />b{")"} París*
            <br />c{")"} Roma
            <br />
            <br />
            # Sección 2<br />
            $ ¿Cuál es el río más largo del mundo?
            <br />
            1. Amazonas*
            <br />
            2. Nilo
            <br />
            3. Yangtsé
            <br />
            4. De la Plata
            <br />
          </pre>
          <input
            type="file"
            id="file"
            accept=".txt"
            onChange={handleFileUpload}
          />
        </div>
        {fileContent && questions.length > 0 && (
          <p>Se han cargado {questions.length} preguntas.</p>
        )}
        <button className="start-button" onClick={handleStartExam}>
          Comenzar examen
        </button>
      </div>
    </Layout>
  );
};

export default IndexPage;
