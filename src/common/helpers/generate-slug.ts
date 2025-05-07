import slugify from 'slugify';
import { FindOptionsWhere, Repository } from 'typeorm';

export async function generateUniqueSlug<Entity extends object>(
  repo: Repository<Entity>,
  name: string,
  slugField: keyof Entity = 'slug' as keyof Entity,
): Promise<string> {
  const baseSlug = slugify(name, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (
    await repo.findOne({
      where: { [slugField]: slug } as FindOptionsWhere<Entity>,
    })
  ) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
}
