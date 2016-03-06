import { connect } from 'react-redux'
import Header from '../components/Header'

const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

const LoadedHeader = connect(
    mapStateToProps,
)(Header)

export default LoadedHeader
