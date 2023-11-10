# CMD Tools

## Установка

1. Установить пакет _ffmpeg_
```bash
brew install ffmpeg
```
[Для других ОС](https://ffmpeg.org/download.html)

2. Запустить приложение
```bash
npm run watch
npm run start
```

## Список команд
* __ffmpeg__ - набор свободных библиотек с открытым исходным кодом, которые позволяют записывать, конвертировать и передавать цифровые аудио- и видеозаписи в различных форматах.
    Пример выполнения команды:
    ```bash
    ? Путь до файла: /Users/promastersss/Projects/cmd-tools/1.mp3
    ? Имя файла: 2
    ? Кодек [libmp3lame|pcm_s16le|pcm_u8]: libmp3lame
    ? Битрейт [256|128|64]: 256
    ? Каналов [1|2]: 2
    ? Частота [16000|8000]: 16000
    ```

## Добавление новой команды
1. Создать в папке _src/commands/_ папку с названием команды
2. Создать файлы:
    * commnd-name.builder.ts
    * commnd-name.executor.ts
    * commnd-name.types.ts
3. Добавить в конфиг _src/config/config.ts_:
    ```typescript
    "Название команды для вывода в списке": { command: "Название консольной команды", classFactory: "Класс фабрики"}
    ```
