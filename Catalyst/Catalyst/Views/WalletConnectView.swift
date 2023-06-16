//
//  WalletConnectView.swift
//  Catalyst
//
//  Created by Sangeeta Papinwar on 16/06/23.
//

import SwiftUI

struct WalletConnectView: View {
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        GeometryReader { geo in
            VStack(alignment: .center) {
                HStack {
                    Spacer()
                    Image(systemName: "x.circle.fill")
                        .foregroundColor(.secondary)
                        .fixedSize()
                        .frame(width: 50, height: 50)
                        .padding(.trailing)
                }
                Text("Wallet Connect")
                    .font(.title)
                    .fontWeight(.bold)
                    .padding(.top, 15)
                
                HStack {
                    Spacer()
                    ZStack {
                        RoundedRectangle(cornerRadius: 20)
                            .foregroundColor(.white)
                            .shadow(radius: 15)
                        Image("wallet_qr")
                            .resizable()
                            .padding()
                    }
                    .frame(width: geo.size.width * 0.90, height: geo.size.width * 0.90)
                    Spacer()
                }
            }
        }
    }
}

struct WalletConnectView_Previews: PreviewProvider {
    static var previews: some View {
        WalletConnectView()
    }
}
