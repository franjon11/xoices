import { useQuizStore } from "../store/useQuizStore"
import MainContainer from "../components/layout/MainContainter"

const Dashboard = () => {
  const quizzes = useQuizStore((state) => state.quizzes)
  return (
    <MainContainer>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">Quizzes creados: {quizzes.length}</p>
    </MainContainer>
  )
}

export default Dashboard