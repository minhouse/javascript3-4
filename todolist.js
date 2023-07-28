// タスクの連番を管理するための変数
let taskId = 0;
const tasks = [];

// 連番をインクリメントしながらタスクのテキストとボタンを含むHTMLを生成し作成した要素を返す
const createTaskItem = (text) => {
  taskId++;
  // オブジェクト＝辞書の定義
  const task = {
    id: taskId,
    text: text,
    // タスク作成時のデフォルト表示
    status: "作業中",
  };
  tasks.push(task);

  // タスクの表示用要素を作成
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.id = `task_${task.id}`;

  // タスクのテキスト表示用要素を作成
  const taskText = document.createElement("span");

  // 連番と入力したテキストを表示
  taskText.textContent = `${taskId} ${task.text}`;
  taskItem.appendChild(taskText);

  // タスク状態を示すボタン要素を作成
  const statusButton = document.createElement("input");
  statusButton.type = "button";
  statusButton.value = "作業中";

  // タスク削除用のボタン要素を作成
  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "削除";
  // deleteButtonがクリックされたときのイベントハンドラがdeleteTask関数を呼び出し削除対象のidを渡す
  deleteButton.addEventListener("click", () => {
    deleteTask(task.id);
  });

  // updateTask関数を呼び出しタスクの状態を作業中または完了で更新する
  updateTask(task, statusButton);
  taskItem.appendChild(statusButton);

  // タスクの削除ボタンを追加
  taskItem.appendChild(deleteButton);

  // タスク要素を返す
  return taskItem;
};

// 指定されたタスク要素を結果表示領域に追加
const appendResult = (item) => {
  const resultHolder = document.getElementById("result");
  resultHolder.appendChild(item);
};

// 入力されたテキストを取得し新しいタスクを作成して表示領域に追加
const addTask = () => {
  const inputTask = document.getElementById("input_task");
  const taskText = inputTask.value;
  inputTask.value = "";

  const taskItem = createTaskItem(taskText);
  appendResult(taskItem);
};

// 指定されたタスクIDに対応するタスクを配列から削除しHTML要素からも削除
const deleteTask = (taskId) => {
  const index = tasks.findIndex((t) => {
    return t.id === taskId;
  });
  if (index !== -1) {
    tasks.splice(index, 1);
    const taskItem = document.getElementById("task_" + taskId);
    if (taskItem) {
      taskItem.remove();
    }
  }
};

// 指定されたタスクの状態を切り替える
const updateTask = (taskId, statusButton) => {
  statusButton.addEventListener("click", () => {
    if (taskId.status === "作業中") {
      taskId.status = "完了";
    } else {
      taskId.status = "作業中";
    }
    // ステータスボタンの表示を更新
    statusButton.value = taskId.status;
  });
};

// 追加ボタンのクリックイベントをハンドリングし新しいタスクを追加する処理を呼び出し
const addButton = document.getElementById("add_button");
addButton.addEventListener("click", addTask);
