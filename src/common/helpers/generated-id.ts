import { Repository, Entity } from 'typeorm';

export async function generateCustomId(
  prefix: string,
  repository: Repository<any>,
  date: Date,
  idType: string,
): Promise<string> {
  const dateString = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD

  return await repository
    .createQueryBuilder('entity')
    .where(`entity.${idType} LIKE :prefix`, {
      prefix: `${prefix}-${dateString}-`,
    })
    .orderBy(`entity.${idType}`, 'DESC')
    .getOne()
    .then((lastEntity: typeof Entity | null) => {
      const lastNumber = lastEntity
        ? parseInt((lastEntity[idType] as string).split('-')[2])
        : 0;
      const nextNumber = lastNumber + 1;
      return `${prefix}-${dateString}-${nextNumber.toString().padStart(3, '0')}`;
    });
}
