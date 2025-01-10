#include<bits/stdc++.h>
using namespace std;

#define ll long long int
#define loopn for(int i=0; i<n; i++)
#define loopm for(int j=0; j<m; j++)
#define v1 vector<ll>
#define v2 vector<vector<ll>>
#define vp vector<pair<ll,ll>>
#define nl cout<<'\n'
#define pb push_back
const int mod = 1e9 + 7;
ll dx[4] = {-1,+0,+1,+0};
ll dy[4] = {+0,+1,+0,-1};


void solve() {
    ll n, m, start_strength;
    char val;
    cin >> n >> m;

    v2 grid(n, v1(m));
    v1 start(2), end(2);
    loopn loopm {
        cin >> val;
        if (val == 'S') {
            grid[i][j] = 0;
            start[0] = i;
            start[1] = j;
        } else if (val == 'D') {
            grid[i][j] = 0;
            end[0] = i;
            end[1] = j;
        } else {
            grid[i][j] = val - '0';
        }
    }

    v2 dist(n, v1(m));
    loopn loopm cin >> dist[i][j];

    cin >> start_strength;

    priority_queue<vector<ll>, vector<vector<ll>>, greater<vector<ll>>> pq;
    v2 vis(n, v1(m, 1e9));
    vis[start[0]][start[1]] = 0;
    pq.push({0, start_strength, start[0], start[1]});

    while (!pq.empty()) {
        v1 cur = pq.top();
        pq.pop();

        if (cur[2] == end[0] && cur[3] == end[1]) {
            cout << cur[0] << " " << cur[1];
            nl;
            return;
        }

        for (int i = 0; i < 4; i++) {
            ll nx = cur[2] + dx[i];
            ll ny = cur[3] + dy[i];

            if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
                ll shark_strength = grid[nx][ny];
                ll new_strength = cur[1] - shark_strength - 1;
                if (new_strength > 0) {
                    ll new_time = cur[0] + dist[nx][ny];
                    if (vis[nx][ny] > new_time) {
                        vis[nx][ny] = new_time;
                        pq.push({new_time, new_strength, nx, ny});
                    }
                }
            }
        }
    }

    cout << "Not Possible";
    nl;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    ll t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}
