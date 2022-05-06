import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn()
const sendMail = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMail }
);

describe('Submit feedback',() => {
  it('should be able to submit a feedback', async () =>{

    await expect(submitFeedback.execute({
      type: 'Bug',
      comment: 'example comment',
      screenshot: 'data:image/png;base64'
    })).resolves.not.toThrow();
    
    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMail).toHaveBeenCalled()
  })
})

it('should not be able to submit a feedback without type', async () =>{
  await expect(submitFeedback.execute({
    type: '',
    comment: 'example comment',
    screenshot: 'data:image/png;base64'
  })).rejects.toThrow();
})

it('should not be able to submit a feedback without comment', async () =>{
  await expect(submitFeedback.execute({
    type: 'Bug',
    comment: '',
    screenshot: 'data:image/png;base64'
  })).rejects.toThrow();
})

it('should not be able to submit a feedback with an invalid screenshot', async () =>{
  await expect(submitFeedback.execute({
    type: 'Bug',
    comment: 'ta ruim a coisa',
    screenshot: '1123'
  })).rejects.toThrow();
})

