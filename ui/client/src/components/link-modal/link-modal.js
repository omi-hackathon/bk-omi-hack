import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import api from '../../utils/api';
import 'components/link-modal/link-modal.scss';

class LinkModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentWillMount() {
        Modal.setAppElement('#root');
    }

    async action(name) {
        if (!this.state.loading) {
            if (name === 'link') {
                this.setState({ loading: true });
                await api.linkVideo(this.props.licenseID, null);
                this.setState({ loading: false });
                this.props.closeModal(name);
            } else {
                this.props.closeModal(name);
            }
        }
    }

    render() {
        const { title, content, actions } = this.props;
        return (
            <Modal
                portalClassName="link-modal"
                isOpen={this.props.isOpen}
                closeTimeoutMS={300}
                parentSelector={() => document.querySelector('#root')}
                className={{
                    base: 'modal',
                    afterOpen: 'modal__after-open',
                    beforeClose: 'modal__before-close',
                }}
                overlayClassName={{
                    base: 'modal-overlay',
                    afterOpen: 'modal-overlay__after-open',
                    beforeClose: 'modal-overlay__before-close',
                }}
                onRequestClose={this.props.closeModal}>
                <div className="modal__title">
                    <h4>{title}</h4>
                    <div className="close" onClick={() => this.action('cancel')}>
                        ×
                    </div>
                </div>
                <div className="modal__content">{content}</div>
                <div className="modal__actions">
                    {actions.length > 0 &&
                        actions.map((action, i) => (
                            <button
                                key={`action-${i}`}
                                onClick={() => this.action(action.name)}
                                type="button"
                                className={`button ${action.buttonClass}`}>
                                {action.name === 'link' && this.state.loading ? 'loading' : action.name}
                            </button>
                        ))}
                </div>
            </Modal>
        );
    }
}

LinkModal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    content: PropTypes.node,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            buttonClass: PropTypes.string,
        }),
    ),
    title: PropTypes.string,
    licenseID: PropTypes.string,
};

export default LinkModal;
