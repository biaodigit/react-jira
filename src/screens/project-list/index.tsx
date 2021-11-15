import { useState, useEffect } from 'react'
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject, useMount, useDebounce } from 'utils'
import { useHttp } from 'utils/http'

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const client = useHttp()

    const debouncedParam = useDebounce(param, 2000)
    useEffect(() => {
        client('projects', { data: cleanObject(debouncedParam) }).then(setList)
    }, [debouncedParam])

    useMount(() => {
        client('users')
    })
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List />
    </div>
}