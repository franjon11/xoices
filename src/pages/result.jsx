import Layout from "../components/Layout";
import Result from "../components/Result";

const ResultPage = ({ questions, answers }) => {
  return (
    <Layout>
      <Result questions={questions} answers={answers} />
    </Layout>
  );
};

export async function getStaticProps() {
  // Aquí puedes obtener las preguntas y respuestas desde una fuente de datos, como una API
  const questions = [];
  const answers = [];
  return {
    props: { questions, answers },
  };
}

export default ResultPage;
