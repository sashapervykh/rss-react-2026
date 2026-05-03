import type { MovieType } from '../../model/MovieType';

export function MovieCard({ title, description }: MovieType) {
  return (
    <div className="p-[1.5rem] mb-[1rem] rounded-xl box-border bg-slate-50 border-sky-950 border-2">
      <h3 className="font-bold text-left mb-[0.5rem]">Title: {title}</h3>
      <p className="text-justify">
        <span className="font-bold">Description:</span> {description}
      </p>
    </div>
  );
}
