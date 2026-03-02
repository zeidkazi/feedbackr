import { Widget } from "./features/Widget/Widget.tsx";

const App = () => {
  return (
    <div className="min-h-[300vh] w-full bg-slate-50 font-sans text-slate-900">
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 text-center font-bold shadow-sm">
        I am a sticky nav. I should always be at the top of the screenshot!
      </div>

      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-32 px-10 text-white shadow-md">
        <h1 className="text-5xl font-extrabold tracking-tight">Scroll Down!</h1>
      </header>

      <main className="mx-auto max-w-5xl p-10 mt-32 space-y-32">
        <section className="rounded-2xl bg-white p-12 shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold mb-4">Section 1: The Middle</h2>
          <p className="text-lg">
            Scroll down so only this box is visible on your screen, then open
            the widget and snap a picture.
          </p>
        </section>

        <section className="rounded-2xl bg-slate-900 text-white p-12 shadow-sm border border-slate-800">
          <h2 className="text-3xl font-bold mb-4">Section 2: The Bottom</h2>
          <p className="text-lg">
            Now scroll all the way down here. The screenshot should only capture
            this dark box.
          </p>
        </section>
      </main>

      <Widget />
    </div>
  );
};

export default App;
