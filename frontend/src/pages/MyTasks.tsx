import React, { useState, useEffect } from 'react'
import { users } from '../api'
import { TaskInstance } from '../types'

interface Task {
  id: number
  title?: string
  description?: string
  current_stage?: string
  elapsed_time?: string
  assignee?: string
  flow_type?: string
}

function MyTasks(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await users.getMyTasks()
      // Type assertion since API response structure may vary
      const tasksData = (response.data as any).tasks || response.data || []
      // Ensure tasksData is an array
      const tasksArray = Array.isArray(tasksData) ? tasksData : []
      setTasks(tasksArray)
    } catch (err) {
      console.error('Failed to load tasks:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const renderTaskCard = (task: Task): React.ReactElement => (
    <div
      key={task.id}
      className="card bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    >
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="card-title text-lg font-semibold text-gray-900 mb-1">
              {task.title || 'Untitled Task'}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Current Stage: <span className="font-medium text-primary-600">{task.current_stage || 'N/A'}</span>
            </p>
            {task.description && (
              <p className="text-sm text-gray-700 mb-2">{task.description}</p>
            )}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {task.elapsed_time && <span>⏱️ {task.elapsed_time}</span>}
              {task.assignee && <span>👤 {task.assignee}</span>}
            </div>
          </div>
          <div>
            <span className="badge badge-primary">Active</span>
          </div>
        </div>
      </div>
    </div>
  )

  const groupedTasks = tasks.reduce<Record<string, Task[]>>((acc, task) => {
    const flowType = task.flow_type || 'Other'
    if (!acc[flowType]) {
      acc[flowType] = []
    }
    acc[flowType].push(task)
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h2>
        <p className="text-gray-600">Your assigned workflows and tasks</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-2 text-gray-600">Loading your tasks...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error loading tasks: {error}</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && tasks.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks assigned</h3>
          <p className="mt-1 text-sm text-gray-500">You don't have any tasks assigned to you at the moment.</p>
        </div>
      )}

      {/* Tasks List */}
      {!loading && !error && tasks.length > 0 && (
        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([flowType, flowTasks]) => (
            <div key={flowType} className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{flowType}</h3>
              <div className="space-y-3">
                {flowTasks.map(renderTaskCard)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyTasks
