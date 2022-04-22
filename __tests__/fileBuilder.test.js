import fileBuilder from '../src/fileBuilder.js';

test('fileNameBuilder', () => {
  const file = fileBuilder('https://ru.hexlet.io/courses');
  expect(file).toBe('ru-hexlet-io-courses.html');
});
