import React from 'react';

class NotFound extends React.Component {
    componentDidMount() {
        document.title = "NotFound";
    }

    render() {
        return (
            <div>
                <div class="text-center center-position">
                    <h1 style={{ fontSize: '28px' }}>404 - Page not found</h1>
                </div>
            </div>
        );
    }
}

export default NotFound;