import { useState, useEffect } from 'react'

/** Custom hook for keeping state data synced with localStorage.
 *
 * This creates `item` as state and looks in localStorage for current value
 * (if not found, defaults to `firstValue`)
 *
 * When `item` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 */

const useLocalStorage = (keyName, firstValue = null) => {
    const initialValue = localStorage.getItem(keyName) || firstValue

    const [item, setItem] = useState(initialValue)

    useEffect(function setKeyInLocalStorage() {
        if (item === null) {
            localStorage.removeItem(keyName)
        } else {
            localStorage.setItem(keyName, item)
        }

    }, [keyName, item])

    return [item, setItem]
}

export default useLocalStorage;
