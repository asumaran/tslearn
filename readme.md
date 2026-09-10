### JS/TS practice

A scratchpad for solving JavaScript and TypeScript exercises from different
sources: interview questions, coding challenges and anything else worth
practicing. Each exercise lives in its own file under `tasks/`.

### Run a file once:
```bash
npm run dev tasks/debounce.ts
```

### Run a file in watch mode:
```bash
npm run dev:watch tasks/promiseAll.ts
```

### Start a new task:
```bash
npm run new myTask
```

Creates `tasks/myTask.ts` and opens it in `nvim`. If the file already exists,
it offers to create the next free name instead (`myTask2.ts`, `myTask3.ts`, ...).
Inside herdr, `dev:watch` runs in a sibling pane that closes when the editor exits.
