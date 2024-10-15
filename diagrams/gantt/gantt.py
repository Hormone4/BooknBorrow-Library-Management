import matplotlib.pyplot as plt
import pandas as pd
tasks_updated = {
    'Backend Implementation - User Management': [0.5, 1.5],
    'Backend Implementation - Book System Management': [1.5, 2.5],
    'Backend Debugging & Testing': [2.5, 3.5],
    'Styling & CSS': [3, 4],
    'Final Testing & Finishing': [4, 5],
    'Connecting Backend to Front-end': [3, 4],
    'Third-Party Services Integration': [3.5, 4.5]
}

df_tasks_updated = pd.DataFrame(tasks_updated).T
df_tasks_updated.columns = ['Start', 'End']

plt.figure(figsize=(10, 6))
for i, task in enumerate(df_tasks_updated.index):
    plt.barh(task, df_tasks_updated.loc[task, 'End'] - df_tasks_updated.loc[task, 'Start'],
             left=df_tasks_updated.loc[task, 'Start'], height=0.4)

plt.xlabel('Weeks')
plt.ylabel('Tasks')
plt.title('Gantt Chart - Weekly Estimation')
plt.grid(True)
plt.tight_layout()

plt.show()
