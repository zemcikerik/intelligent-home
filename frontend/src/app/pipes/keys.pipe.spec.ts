import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
  let pipe: KeysPipe;

  beforeEach(() => pipe = new KeysPipe());

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return keys of passed object', () => {
    // given
    const object = { a: 1, b: 2, '^$%$': 5 };

    // when
    const result = pipe.transform(object);

    // then
    expect(result).toEqual(['a', 'b', '^$%$']);
  });
});
