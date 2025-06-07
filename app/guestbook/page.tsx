import CreationForm from './creationForm';
import History from './history';

export default function Guestbook() {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight text-balance mb-4">Guestbook</h2>
      <div className="flex flex-col gap-8">
        <CreationForm />
        <History />
      </div>
    </>
  );
}
