import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Loading = ({}) => {

    const { nextUrl } = useParams()
    const nav = useNavigate()

    useEffect(() => {

        // console.log('Next Url: ', nextUrl)
        if(nextUrl)
            setTimeout(() => {
                nav('/' + nextUrl)
            }, 8 * 1000)
    }, [])

    return <div className='flex justify-center items-center h-[80vh]'>
        <div className='animate-spin rounded-full h-14 w-14 border-2 border-t-primary'/>
    </div>
}

export default Loading