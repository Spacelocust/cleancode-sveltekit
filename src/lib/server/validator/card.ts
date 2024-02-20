import { boolean, maxLength, minLength, object, optional, string } from 'valibot';

export const CreateCardSchema = object({
  question: string('You must provide a question.', [
    minLength(1, 'Question must be at least 1 character long.'),
    maxLength(255, 'Question must be at most 255 characters long.'),
  ]),
  answer: string('You must provide an answer.', [
    minLength(1, 'Answer must be at least 1 character long.'),
    maxLength(255, 'Answer must be at most 255 characters long.'),
  ]),
  tag: optional(string([maxLength(255, 'Tag must be at most 255 characters long.')])),
});

export const AnswerCardSchema = object({
  isValid: boolean(),
});
