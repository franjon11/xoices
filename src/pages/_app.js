import { QuestionProvider } from "../utils/QuestionContext";

function Xoices({ Component, pageProps }) {
  const { questions } = pageProps;
  return (
    <QuestionProvider questions={questions}>
      <Component {...pageProps} />
    </QuestionProvider>
  );
}

export default Xoices;
