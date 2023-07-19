import { QuestionProvider } from "../utils/QuestionContext";

function Xoices({ Component, pageProps }) {
  return (
    <QuestionProvider>
      <Component {...pageProps} />
    </QuestionProvider>
  );
}

export default Xoices;
