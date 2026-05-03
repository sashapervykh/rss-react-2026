import type { MovieType } from '../../model/MovieType';

export function MovieCard({ title, description }: MovieType) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
