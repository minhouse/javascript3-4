// タスクの連番を管理するための変数
let taskId = 0;
const tasks = [];

// タスクの表示用要素を作成
const createTaskItem = (task) => {
  // タスクの表示用要素を作成
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.id = `task_${task.id}`;

  // タスクのテキスト表示用要素を作成
  const taskText = document.createElement("span");

  // 連番と入力したテキストを表示
  taskText.textContent = `${task.id} ${task.text}`;
  taskItem.appendChild(taskText);

  // タスク状態を示すボタン要素を作成
  const statusButton = document.createElement("input");
  statusButton.type = "button";
  statusButton.value = task.status;

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
  // 入力欄を空にする
  inputTask.value = "";

  taskId++;
  const task = {
    id: taskId,
    text: taskText,
    status: "作業中",
  };
  tasks.push(task);

  const taskItem = createTaskItem(task);
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

// ラジオボタンの値を取得する関数
const getSelectedStatus = () => {
  const radioButtons = document.getElementsByName("item");
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
  return "all";
};

// 現在表示されているタスクとその作業中または完了ステータスを取得
const showTasks = () => {
  // 選択されたラジオボタンの値を取得
  const selectedStatus = getSelectedStatus();

  // タスク表示領域の要素を取得
  const resultHolder = document.getElementById("result");
  resultHolder.innerHTML = ""; // タスク表示領域をクリア

  // 選択されたステータスに応じてタスクをフィルタリングして表示
  tasks.forEach((task) => {
    if (
      selectedStatus === "all" ||
      (selectedStatus === "progress" && task.status === "作業中") ||
      (selectedStatus === "complete" && task.status === "完了")
    ) {
      const taskItem = createTaskItem(task); // タスクオブジェクトを渡す
      resultHolder.appendChild(taskItem);
    }
  });
};

// 指定されたタスクの状態を切り替える
const updateTask = (task, statusButton) => {
  statusButton.addEventListener("click", () => {
    if (task.status === "作業中") {
      task.status = "完了";
    } else {
      task.status = "作業中";
    }
    // ステータスボタンの表示を更新
    statusButton.value = task.status;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  let prevSelectedStatus = getSelectedStatus(); // 前回選択されていたステータスを保存

  showTasks();

  // ラジオボタンがクリックされたときにタスクを再表示する
  const radioButtons = document.getElementsByName("item");
  for (const radioButton of radioButtons) {
    radioButton.addEventListener("click", () => {
      const currentSelectedStatus = getSelectedStatus();
      if (currentSelectedStatus !== prevSelectedStatus) {
        prevSelectedStatus = currentSelectedStatus;
        showTasks();

        // 他のラジオボタンの選択を解除
        for (const otherRadioButton of radioButtons) {
          if (otherRadioButton !== radioButton) {
            otherRadioButton.checked = false;
          }
        }
      }
    });
  }
});

// 追加ボタンのクリックイベントをハンドリングし新しいタスクを追加する処理を呼び出し
const addButton = document.getElementById("add_button");
addButton.addEventListener("click", addTask);
