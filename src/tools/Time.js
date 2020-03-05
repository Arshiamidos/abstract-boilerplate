import React from 'react';
import jMoment from 'moment-jalaali'
import BaseComponent from "components/BaseComponent";

class Time extends BaseComponent {

    getMonthName(i) {
        let month = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

        return month[parseInt(i,10)];
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    render() {

        if (this.props.time) {

            let t = this.isNumeric(this.props.time) ? this.props.time*1000 : this.props.time;
            t = jMoment(t);

            return super.render(

                <div className="time">
                    {t.jDate()} {this.getMonthName(t.jMonth())} {t.jYear()}
                </div>
            );
        }

        return ('')
    }
}

export default Time;
