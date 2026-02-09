import { useQuizStore } from "../store/useQuizStore"

const Dashboard = () => {
  const quizzes = useQuizStore((state) => state.quizzes)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg">Quizzes creados: {quizzes.length}</p>
    </div>
  )
}

export default Dashboard