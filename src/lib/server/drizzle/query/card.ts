import { and, eq, isNull, or, sql } from 'drizzle-orm';
import { categories, categoryFrequency } from '../enum';
import { cards } from '../table/cards';

/**
 * You must add the `parameterName` parameter in your `execute` statement, containing the date you want to compare with.
 * @param parameterName The name of the parameter to use in the `execute` statement.
 * @returns The SQL condition to match the category of a card with the date.
 */
export const categoryMatchesDate = (parameterName = 'date') =>
  or(
    and(eq(cards.category, categories.first), isNull(cards.lastAnsweredAt)),
    ...Object.values(categories)
      .filter((category) => category !== categories.done)
      .map((category) =>
        and(
          eq(cards.category, category),
          sql`DATEDIFF(${sql.placeholder(parameterName)}, ${cards.lastAnsweredAt}) >= ${categoryFrequency[category]}`,
        ),
      ),
  );
