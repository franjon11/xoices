import { FilePlus2, Folder } from "lucide-react"
import MainContainer from "../components/layout/MainContainter"
import SectionContainer from "../components/layout/Section/SectionContainer"
import QuizInfo from "../components/quiz/Details/QuizInfo"
import Button from "../components/ui/Button"
import useMergeQuiz from "../hooks/useMergeQuiz"
import SelectableQuiz from "../components/quiz/Merge/SelectableQuiz"
import CollapsibleQuiz from "../components/quiz/Merge/CollapsibleQuiz"
import EmptyQuizAlert from "../components/quiz/Merge/EmptyQuizAlert"
import EmptyLibraryAlert from "../components/quiz/Merge/EmptyLibraryAlert"

const QuizMerge = () => {
  const {
    refTitle,
    refDescription,
    quizzesSelected,
    selectableQuizzes,
    handleSelectQuiz,
    handleSelectQuestion,
    handleRemoveQuiz,
    handleAddNewQuiz
  } = useMergeQuiz();

  return (
    <MainContainer>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-6">
          {/* Title Quiz */}
          <QuizInfo
            title={{ ref: refTitle, value: "" }}
            description={{ ref: refDescription, value: "" }}
          />

          {/* Quiz List */}
          <div className="flex-1 overflow-y-auto pb-32 custom-scrollbar">
            <div className="flex flex-col gap-6 max-w-4xl">
              {
                quizzesSelected.length === 0 ? <EmptyQuizAlert /> :
                quizzesSelected.map(q =>
                  <CollapsibleQuiz
                    key={`collapsible-quiz-${q.id}`}
                    open
                    title={q.title}
                    questions={q.questions}
                    onSelectQuestion={handleSelectQuestion(q.id)}
                    onRemove={handleRemoveQuiz(q.id)}
                  />
                )
              }
            </div>
          </div>
        </div>
        <aside className="lg:col-span-4 space-y-8">
          <Button className="sticky top-20 w-full" onClick={handleAddNewQuiz}>
              <FilePlus2 /> Crear Examen
          </Button>
          <SectionContainer className="sticky p-6 top-35 dark:bg-slate-700" bg="white/50">
            <main className="space-y-6">
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 text-sage">
                  <Folder size={20} strokeWidth={2.5}  />
                  <h2 className="text-md font-black uppercase"> Mis Examenes</h2>
                </div>
                <div className="space-y-2">
                  {
                      selectableQuizzes.length === 0 ? <EmptyLibraryAlert /> :
                      selectableQuizzes.map(q =>
                        <SelectableQuiz
                          key={`selectable-quiz-${q.id}`}
                          onSelected={handleSelectQuiz(q.id)}
                          title={q.title}
                          totalQuestions={q.questions.length}
                          createdAt={q.createdAt}
                        />
                      )
                  }
                </div>
              </div>

              
              {/* 
                TODO: QUIZ FAVORITAS
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 text-sage">
                  <Star size={20} strokeWidth={2.5} />
                  <h2 className="text-md font-black uppercase"> Favoritos</h2>
                </div>
                <div className="space-y-2">
                  <DragableQuiz />
                  <DragableQuiz />
                </div>
              </div> */}
            </main>
          </SectionContainer>
        </aside>
      </div>
    </MainContainer>
  )
}

export default QuizMerge