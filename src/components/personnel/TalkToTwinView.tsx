import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../services/storeContext';
import { MessageSquare, Send, ShieldCheck, LifeBuoy, TrendingUp, Sparkles, User, Bot, Lock } from 'lucide-react';
import { ChatMessage } from '../../types';

interface TalkToTwinViewProps {
  onOpenSupportModal: () => void;
}

export const TalkToTwinView: React.FC<TalkToTwinViewProps> = ({ onOpenSupportModal }) => {
  const { currentUser, baseline, welfareCases, setActiveView } = useStore();
  const myCase = welfareCases.find(c => c.personnelId === currentUser.id) || welfareCases[0];

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-01',
      sender: 'twin',
      text: `Hello ${currentUser.rank} ${currentUser.name.split(' ')[0]}. I am your confidential Personal Welfare Twin.\n\nI have observed elevated duty hours (56h vs your 44h baseline) and a recent sleep deficit over the past three weeks. How are you feeling physically and mentally today?`,
      timestamp: '08:00 AM',
      suggestedActions: [
        { label: 'Why did my signal change?', actionId: 'why_signal' },
        { label: 'What can I do about fatigue?', actionId: 'fatigue_tips' },
        { label: 'Connect me to Welfare Support', actionId: 'request_support' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = [
    'Why did my welfare signal change?',
    'How has my wellness changed?',
    'What can I do about workload?',
    'Should I request support?',
    'Show my recent trends'
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/twin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: {
            name: currentUser.name,
            rank: currentUser.rank,
            unit: currentUser.unitName,
            baselineDuty: `${baseline.averageWeeklyDutyHours} hours`,
            currentDuty: '56 hours (+12h deviation)',
            baselineSleep: `${baseline.baselineSleepHours} hours`,
            currentSleep: '5.4 hours (-1.8h deficit)',
            daysSinceLeave: '128 days (38 days overdue)',
            signalLevel: `${myCase.level} (${myCase.score}/100)`
          }
        })
      });

      const data = await response.json();
      const replyText = data.reply || 'I am here with you. Can you tell me more about how this workload is impacting your sleep?';

      const twinMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'twin',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: 'Request Confidential Support', actionId: 'request_support' },
          { label: 'View 12-Month Trends', actionId: 'view_journey' }
        ]
      };

      setMessages(prev => [...prev, twinMsg]);
    } catch (err) {
      // Offline fallback
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'twin',
        text: `I've analyzed your telemetry against your 12-month baseline:\n• Duty hours: 56h vs 44h standard baseline.\n• Sleep average: 5.4h vs 7.2h normal.\n• Leave overdue: +38 days.\n\nThis reflects sustained operational pressure, not any personal failing. I strongly recommend scheduling an informal dialogue with Major Anita Sharma to discuss leave rotation and duty pacing.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: 'Request Support Now', actionId: 'request_support' }
        ]
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (actionId: string) => {
    if (actionId === 'request_support') {
      onOpenSupportModal();
    } else if (actionId === 'view_journey') {
      setActiveView('personnel-journey');
    } else if (actionId === 'why_signal') {
      handleSend('Why did my welfare signal change?');
    } else if (actionId === 'fatigue_tips') {
      handleSend('What can I do about workload and fatigue?');
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col h-[740px] max-w-4xl mx-auto">
      {/* Twin Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            PW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Personal Welfare Twin</h2>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded">
                Grounded in Personal Baseline
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Confidential · AI identifies signals, humans make decisions · Zero commander access
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpenSupportModal}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-medium transition-colors"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-slate-600" />
            <span>Request Support</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                msg.sender === 'user'
                  ? 'bg-slate-800 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 shadow-xs'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-xl space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-4 rounded-xl text-xs leading-relaxed whitespace-pre-line border ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-800 border-slate-200 shadow-xs'
                }`}
              >
                {msg.text}
              </div>

              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleActionClick(action.actionId)}
                      className="text-[11px] font-medium py-1 px-2.5 bg-white text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-slate-400 block px-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-lg border border-slate-200 w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-slate-400" />
            <span>Reflecting on your baseline and wellness history...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-6 py-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap mr-1">
          Quick queries:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-[11px] py-1 px-2.5 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md whitespace-nowrap transition-colors border border-slate-200"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your Personal Welfare Twin about baseline, fatigue, duty hours or leave..."
            className="flex-1 py-2.5 px-3.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="py-2.5 px-4 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" />
            Conversations are private to you and never shared with commanders or promotion boards.
          </span>
          <span>Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};
