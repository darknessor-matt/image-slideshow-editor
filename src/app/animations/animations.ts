import { Component, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

export function slideShowAnimation(name: string, opct:number) {
    return trigger(name, [
        state('shown', style({ opacity: opct, transform: 'translateX(-50%) translateY(0%)' })),
        state('no-animation', style({ opacity: 1 })),
        state('hidden', style({ opacity: 0 })),
        state('bottom', style({ opacity: 1, transform: 'translateX(-50%) translateY(25em)' })),
        state('top', style({ opacity: 1, transform: 'translateX(-50%) translateY(-25em)' })),
        state('left', style({ opacity: 1, transform: 'translateX(-100%)' })),
        state('right', style({ opacity: 1, transform: 'translateX(100%)' })),
        transition('shown => hidden', animate('0ms 500ms')),
        transition('hidden => shown', animate('500ms')),
        transition('bottom => shown', animate('500ms')),
        transition('top => shown', animate('500ms')),
        transition('left => shown', animate('500ms')),
        transition('right => shown', animate('500ms')),
    ]);
}